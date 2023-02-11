export class ApiCallTracker {
  public count = 0;
  incr() {
    this.count += this.count;
  }
}
