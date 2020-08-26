import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';

import 'hammerjs';
import { MenuComponent } from './menu/menu.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DishService } from './service/dish.service';
import { LeaderService } from './service/leader.service';
import { PromotionService } from './service/promotion.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';

@NgModule({
	declarations: [
		AppComponent,
		MenuComponent,
		DishdetailComponent,
		HeaderComponent,
		FooterComponent,
		AboutComponent,
		HomeComponent,
		ContactComponent,
		LoginComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		FlexLayoutModule,
		MatProgressSpinnerModule,
		MatListModule,
		MatGridListModule,
		MatCardModule,
		MatButtonModule,		
		AppRoutingModule,
		MatDialogModule,
		MatFormFieldModule, 
		MatInputModule,
		MatCheckboxModule,
		MatSelectModule,
	MatSlideToggleModule,
	MatSliderModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		DishService,
		PromotionService,
		LeaderService
	],
	entryComponents: [
		LoginComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
