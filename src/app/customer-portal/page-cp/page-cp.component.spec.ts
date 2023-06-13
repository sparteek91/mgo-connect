import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCpComponent } from './page-cp.component';

describe('PageCpComponent', () => {
  let component: PageCpComponent;
  let fixture: ComponentFixture<PageCpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageCpComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
