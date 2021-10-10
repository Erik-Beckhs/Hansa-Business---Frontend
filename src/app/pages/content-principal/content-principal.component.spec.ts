import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPrincipalComponent } from './content-principal.component';

describe('ContentPrincipalComponent', () => {
  let component: ContentPrincipalComponent;
  let fixture: ComponentFixture<ContentPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
