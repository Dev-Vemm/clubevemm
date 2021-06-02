import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerflFotoComponent } from './perfl-foto.component';

describe('PerflFotoComponent', () => {
  let component: PerflFotoComponent;
  let fixture: ComponentFixture<PerflFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerflFotoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerflFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
