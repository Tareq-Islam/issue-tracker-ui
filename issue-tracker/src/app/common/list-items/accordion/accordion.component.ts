import { Component, Input } from '@angular/core';

@Component({
  selector: 'eye-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  @Input() styleClass!: string;
  @Input() firstRowStyle!: string;
  @Input() secondRowStyle!: string;
  @Input() uniqueId: any = 0;
  onAccordin(uniqDivId: string) {
    const div = document.getElementById(uniqDivId);
    if (div?.children[0].classList.contains('pi-plus-circle')) {
      div?.classList.add('first-row');
      div?.children[0].classList.replace('pi-plus-circle', 'pi-minus-circle');
      div?.nextElementSibling?.classList.remove('hidden');
    } else {
      div?.classList.remove('first-row');
      div?.children[0].classList.replace('pi-minus-circle', 'pi-plus-circle');
      div?.nextElementSibling?.classList.add('hidden');
    }
  }
}
