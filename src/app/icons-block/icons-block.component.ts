import { Component, Input } from '@angular/core';
import { IconsDTO } from '../common/interfaces';

@Component({
  selector: 'app-icons-block',
  templateUrl: './icons-block.component.html',
  styleUrls: ['./icons-block.component.scss']
})
export class IconsBlockComponent {
  @Input() iconsGroup: IconsDTO = {} as IconsDTO;
}
