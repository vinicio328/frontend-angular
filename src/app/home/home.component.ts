import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../service/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../service/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../service/leader.service';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	dish: Dish;
	promotion: Promotion;
	leader: Leader;

	constructor(private dishservice: DishService,
		private promotionservice: PromotionService,
		private leaderService: LeaderService) { }

	ngOnInit() {
		this.dishservice.getFeaturedDish()
			.subscribe(dish => this.dish = dish);
		this.promotionservice.getFeaturedPromotion()
			.subscribe(promotion  => this.promotion = promotion);
		this.leaderService.getFeaturedLeader()
			.subscribe(leader => this.leader = leader);
	}
}
