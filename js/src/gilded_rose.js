function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (items[i].quality > 0) {
        if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
          items[i].quality = items[i].quality - 1
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
        if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
        }
      }
    }
    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (items[i].name != 'Aged Brie') {
        if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].quality > 0) {
            if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
              items[i].quality = items[i].quality - 1
            }
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
      }
    }
  }
}

/**
 * Initially I destructured this:
 *
 * function updateCommonItem({ name, sell_in, quality }) {
 *   return {
 *     name,
 *     sell_in: sell_in - 1,
 *     ...
 *  }
 * }
 *
 * But based on the existing behavior it seems intended to mutate in place, so
 * let's assume that's intentional and leave it for now.
 */
function updateCommonItem(item) {
  item.sell_in = item.sell_in - 1;
  item.quality = item.sell_in > 0 ? item.quality - 1 : item.quality - 2;
  item.quality = Math.max(0, item.quality);
  return item;
}

/**
 * There's some ambiguity in the original update_quality() method where Brie
 * quality is increased by 2, but that's never made explicit in the spec. I'm
 * keeping the behavior but would want to clarify with the stakeholder.
 */
function updateBrie(item) {
  item.sell_in = item.sell_in - 1;
  item.quality = item.quality + 2;
  item.quality = Math.min(50, item.quality);
  return item;
}

/**
 * We're starting to see some duplication here -- for instance, the boundary
 * checking (`Math.min(50, item.quality)`). It's tempting to DRY that up, but
 * I have no reason based on the spec as written to believe that this
 * particular logic is changing any time soon. Until then, I think it's
 * premature to spend time on it.
 */
function updateBackstage(item) {
  item.sell_in = item.sell_in - 1;
  item.quality = item.quality + 1;

  // probably a prettier way to do this -- i think having multiple conditionals
  // apply is not the easiest to reason about
  if (item.sell_in < 10) {
    item.quality = item.quality + 1;
  }
  if (item.sell_in < 5) {
    item.quality = item.quality + 1;
  }
  if (item.sell_in < 0) {
    item.quality = 0;
  }

  item.quality = Math.min(50, item.quality);
  return item;
}

function updateSulfuras(item) {
  return item;
}
