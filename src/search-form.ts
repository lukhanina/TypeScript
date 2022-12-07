import { renderBlock } from './lib.js'

export function renderSearchFormBlock () {
  const today:Date = new Date();
  const todayToString:string = today.toISOString().substring(0, 10);
  const year:number = +todayToString.substring(0, 4);
  const lastMonth:number = +todayToString.substring(5, 7) + 1;
  const last:Date = new Date(year, lastMonth, 0);
  const lastDayNextMonth:string = last.toISOString().substring(0, 10);
  const nextDay:Date = new Date();
  nextDay.setDate(nextDay.getDate() + 1);
  const nextDayToString:string = nextDay.toISOString().substring(0, 10);
  const plusTwo:Date = nextDay;
  plusTwo.setDate(plusTwo.getDate() + 2);
  const plusTwoDaysToString:string = plusTwo.toISOString().substring(0, 10)

  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${nextDayToString}" min="${todayToString}" max="${lastDayNextMonth}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${plusTwoDaysToString}" min="${todayToString}" max="${lastDayNextMonth}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}
