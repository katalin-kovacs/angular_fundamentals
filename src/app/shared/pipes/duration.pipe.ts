import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "duration",
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    // Handle zero or negative values
    if (value <= 0) {
      return "0 minutes";
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    const hoursText = hours > 0 ? `${hours}` : "";
    const minutesText = minutes > 0 ? `${minutes}` : "";

    return hours > 0
      ? `${hoursText}:${minutesText} hours`
      : `${minutesText} minutes`;
  }
}
