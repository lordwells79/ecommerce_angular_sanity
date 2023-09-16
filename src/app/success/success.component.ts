import { Component } from '@angular/core';
import { runFireworks } from '../lib/util';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent {
  ngOnInit() {
    runFireworks();
  }
}
