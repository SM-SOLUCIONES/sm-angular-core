import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmCoreComponent } from './sm-core.component';

describe('SmCoreComponent', () => {
  let component: SmCoreComponent;
  let fixture: ComponentFixture<SmCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmCoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
