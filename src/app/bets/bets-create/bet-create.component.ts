import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SwiperOptions } from 'swiper';

import { BetsService } from '../bets.service';
import { Bet } from '../bet.model';
import { mimeType } from './mime-type.validator';


@Component({
  selector: 'app-bet-create',
  templateUrl: './bet-create.component.html',
  styleUrls: ['./bet-create.component.scss']
})
export class BetCreateComponent implements OnInit {
  title = '';
  content = '';
  type = '';
  endDate: '';
  bet: Bet;
  imagePreview: string;
  form: FormGroup;
  mode = 'create';
  private betId: string;


config: SwiperOptions = {
  slidesPerView: 'auto',
  allowTouchMove: true,
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  },
};

  constructor(
    public betsService: BetsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      type: new FormControl(null, { validators: [Validators.required] }),
      dateEnd: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('betId')) {
        this.mode = 'edit';
        this.betId = paramMap.get('betId');
        this.betsService.getBet(this.betId).subscribe(betData => {
          this.bet = {
            id: betData._id,
            title: betData.title,
            content: betData.content,
            imagePath: betData.imagePath,
            creator: betData.creator,
            type: betData.type,
            dateEnd: betData.dateEnd,
          };
          this.form.setValue({
            title: this.bet.title,
            content: this.bet.content,
            image: this.bet.imagePath,
            type: this.bet.type,
            dateEnd: this.bet.dateEnd,
          });
        });
      } else {
        this.mode = 'create';
        this.betId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveBet() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.betsService.addBet(this.form.value.title, this.form.value.content, this.form.value.type, this.form.value.dateEnd, this.form.value.image);
    } else {
      this.betsService.updateBet(
        this.betId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.type,
        this.form.value.dateEnd,
        this.form.value.image
        );
    }
    this.form.reset();
  }
}
