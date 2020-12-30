import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';

import { DishService } from '../service/dish.service';

import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { visibility, flyInOut, expand } from '../animations/app.animation';

@Component({
	selector: 'app-dishdetail',
	templateUrl: './dishdetail.component.html',
	styleUrls: ['./dishdetail.component.scss'],
	// tslint:disable-next-line:use-host-property-decorator
	host: {
		'[@flyInOut]': 'true',
		'style': 'display: block;'
	},
	animations: [
		flyInOut(),
		visibility(),
		expand()
	]
})
export class DishdetailComponent implements OnInit {

	@ViewChild('fform') commentFormDirective;

	commentForm: FormGroup;
	tempComment: Comment;

	dish: Dish;
	dishcopy: Dish;
	errMess: string;
	dishIds: number[];
	prev: number;
	next: number;
	visibility = 'shown';
	formErrors = {
		'author': '',
		'comment': ''
	};

	validationMessages = {		
		'author': {
			'required':      'Author name is required.',
			'minlength':     'Author name must be at least 2 characters long.',
		},
		'comment': {
			'required':      'Comment is required.'
		}
	};


	constructor(private dishservice: DishService,
		private route: ActivatedRoute,
		private location: Location,
		private fb: FormBuilder,
		@Inject('BaseURL') private baseURL) {
		this.createForm();
	}

	createForm() {
		this.commentForm = this.fb.group({
			author: ['', [Validators.required, Validators.minLength(2)] ],
			comment: ['', [Validators.required] ],
			rating: 5
		});

		this.commentForm.valueChanges
		.subscribe(data => this.onValueChanged(data));

		this.onValueChanged(); // (re)set validation messages now
	}

	onSubmit() {
		this.tempComment = this.commentForm.value;
		this.tempComment.date = new Date().toISOString();
		this.commentForm.reset({
			author: '',
			comment: '',
			rating: 5
		});

		this.dishcopy.comments.push(this.tempComment);
		this.dishservice.putDish(this.dishcopy)
		.subscribe(dish => {
			this.dish = dish; this.dishcopy = dish;
		}, 
		errmess => {
			this.dish = null; this.dishcopy = null; this.errMess = <any>errmess;
		});
	}


	onValueChanged(data?: any) {

		if (!this.commentForm) { return; }
		const form = this.commentForm;
		for (const field in this.formErrors) {
			if (this.formErrors.hasOwnProperty(field)) {
				// clear previous error message (if any)
				this.formErrors[field] = '';
				const control = form.get(field);
				if (control && control.dirty && !control.valid) {
					const messages = this.validationMessages[field];
					for (const key in control.errors) {
						if (control.errors.hasOwnProperty(key)) {
							this.formErrors[field] += messages[key] + ' ';
						}
					}
				}
			}
		}
	}

	ngOnInit() {
		this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
		this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
		.subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
			errmess => this.errMess = <any>errmess);
	}

	setPrevNext(dishId: number) {
		const index = this.dishIds.indexOf(dishId);
		this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
		this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
	}

	goBack(): void {
		this.location.back();
	}
}
