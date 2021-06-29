import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComprovantePage } from './comprovante.page';

describe('ComprovantePage', () => {
  let component: ComprovantePage;
  let fixture: ComponentFixture<ComprovantePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprovantePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComprovantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
