import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantFormsComponent } from './restaurant-forms.component';

describe('RestaurantFormsComponent', () => {
  let component: RestaurantFormsComponent;
  let fixture: ComponentFixture<RestaurantFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
