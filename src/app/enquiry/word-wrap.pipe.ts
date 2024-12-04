import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordWrap',
  pure: true

})
export class WordWrapPipe implements PipeTransform {

  constructor(private cdr: ChangeDetectorRef) { }

  transform(value: string, width:number): string {
    // console.log(value,width)
    const words = value.split(' ');
    const wrappedText = [];

    let currentLine = '';

    for (const word of words) {
      if (currentLine.length + word.length > width) {
        wrappedText.push(currentLine);
        currentLine = word;
      } else {
        currentLine += (currentLine ? ' ' : '') + word;
      }
    }

    wrappedText.push(currentLine);
    console.log(wrappedText.join('\n'))
    this.cdr.detectChanges();
    return wrappedText.join('<br>');
  }
}
