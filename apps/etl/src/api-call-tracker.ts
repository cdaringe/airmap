import { updateDailyApiMeta } from "./purpleair/sink/queries";

export class ApiCallTracker {
  public count: number;
  public date: Date;

  constructor(count: number, date: Date) {
    this.count = count;
    this.date = date;
  }

  async incr() {
    this.count = this.count + 1;
    await updateDailyApiMeta({
      date: this.date,
      count_api_calls: this.count,
    });
    if (this.count > 900) {
      throw new Error(`API max call count about to exceed: ${this.count}`);
    }
  }
}
