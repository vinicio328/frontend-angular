import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, expand } from '../animations/app.animation';
import { FeedbackService} from '../service/feedback.service';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss'],
	// tslint:disable-next-line:use-host-property-decorator
	host: {
		'[@flyInOut]': 'true',
		'style': 'display: block;'
	},
	animations: [
		flyInOut(),
		expand()
	]
})
export class ContactComponent implements OnInit {
	
	@ViewChild('fform') feedbackFormDirective;

	isSubmitting: boolean = false;
	feedbackForm: FormGroup;
	feedback: Feedback;
	feedbackcopy: Feedback;
	result: Feedback;
	errMess: string;
	contactType = ContactType;

	formErrors = {
		'firstname': '',
		'lastname': '',
		'telnum': '',
		'email': ''
	};

	validationMessages = {
		'firstname': {
			'required':      'First Name is required.',
			'minlength':     'First Name must be at least 2 characters long.',
			'maxlength':     'FirstName cannot be more than 25 characters long.'
		},
		'lastname': {
			'required':      'Last Name is required.',
			'minlength':     'Last Name must be at least 2 characters long.',
			'maxlength':     'Last Name cannot be more than 25 characters long.'
		},
		'telnum': {
			'required':      'Tel. number is required.',
			'pattern':       'Tel. number must contain only numbers.'
		},
		'email': {
			'required':      'Email is required.',
			'email':         'Email not in valid format.'
		},
	};

	constructor(private fb: FormBuilder,
		private feedbackService: FeedbackService,
		@Inject('BaseURL') private baseURL) {
		this.createForm();
	}

	ngOnInit() {
	}

	createForm() {
		this.feedbackForm = this.fb.group({
			firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
			lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
			telnum: ['', [Validators.required, Validators.pattern] ],
			email: ['', [Validators.required, Validators.email] ],
			agree: false,
			contacttype: 'None',
			message: ''
		});

		this.feedbackForm.valueChanges
		.subscribe(data => this.onValueChanged(data));

		this.onValueChanged(); // (re)set validation messages now
	}

	onSubmit() {
		this.isSubmitting = true;
		this.feedback = this.feedbackForm.value;
		console.log(this.feedback);
		this.feedbackForm.reset({
			firstname: '',
			lastname: '',
			telnum: '',
			email: '',
			agree: false,
			contacttype: 'None',
			message: ''
		});

		this.feedbackService.submitFeedback(this.feedback)
		  	.subscribe(
		    	feedback => {
		    		this.feedback = null; 
		    		this.result = feedback;		    		
		    		this.isSubmitting = false;
			    	setTimeout(() => {
			      		this.result = null;
			    	}, 5000);
	  			},
		  		errmess => { 
		  			this.feedback = null; 
		  			this.result = null; 
		  			this.errMess = <any>errmess; });
		this.feedbackFormDirective.resetForm();
	}

	onValueChanged(data?: any) {
		if (!this.feedbackForm) { return; }
		const form = this.feedbackForm;
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

}
