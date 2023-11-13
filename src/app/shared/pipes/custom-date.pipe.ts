import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customDate",
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string): string {
    const parts = value.split("/");
    if (parts.length === 3) {
      const day = parts[1].toString();
      const month = parts[0].toString();
      const year = parts[2];
      return `${day}.${month}.${year}`;
    }
    // Return the original value if the format is not recognized
    return value;
  }
}
