import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../service/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../service/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../service/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {

	dish: Dish;
	dishErrMess: string;
	promotion: Promotion;
	leader: Leader;

	constructor(private dishservice: DishService,
		private promotionservice: PromotionService,
		private leaderService: LeaderService,
		@Inject('BaseURL') private baseURL) { }

	ngOnInit() {
		this.dishservice.getFeaturedDish()
			.subscribe(dish => this.dish = dish, 
        		errmess => this.dishErrMess = <any>errmess);
		this.promotionservice.getFeaturedPromotion()
			.subscribe(promotion  => this.promotion = promotion);
		this.leaderService.getFeaturedLeader()
			.subscribe(leader => this.leader = leader);
	}
}
