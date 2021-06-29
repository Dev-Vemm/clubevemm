import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SegmentosPage } from './segmentos.page';

describe('SegmentosPage', () => {
  let component: SegmentosPage;
  let fixture: ComponentFixture<SegmentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SegmentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
