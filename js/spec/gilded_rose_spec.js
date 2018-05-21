describe("Gilded Rose", function() {

  describe("update_quality()", () => {
    afterEach(() => items = []);

    describe("common behaviors", () => {
      it("should decrease sell_in", () => {
        items.push(new Item("Foo", 10, 20));
        update_quality();
        expect(items[0].sell_in).toEqual(9);
      });

      it("should decrease quality", () => {
        items.push(new Item("Foo", 10, 20));
        update_quality();
        expect(items[0].quality).toEqual(19);
      });

      it("should decrease quality by 2 if past sell-by", () => {
        items.push(new Item("Foo", 0, 10))
        update_quality();
        expect(items[0].quality).toEqual(8);
      });

      it("should not decrease quality < 0", () => {
        items.push(new Item("Foo", 0, 1))
        update_quality();
        expect(items[0].quality).toEqual(0);
      });
    });

    describe("Brie", () => {
      it("should increase quality", () => {
        items.push(new Item("Aged Brie", 0, 10));
        update_quality();
        expect(items[0].quality).toEqual(12);
      });

      it("should not increase quality > 50", () => {
        items.push(new Item("Aged Brie", 0, 49));
        update_quality();
        expect(items[0].quality).toEqual(50);
      });
    });

    describe("Backstage", () => {
      it("should increase quality", () => {
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
        update_quality();
        expect(items[0].quality).toEqual(21);
      });

      it("should increase quality by 2 when < 10 days left", () => {
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20));
        update_quality();
        expect(items[0].quality).toEqual(22);
      });

      it("should increase quality by 3 when < 5 days left", () => {
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20));
        update_quality();
        expect(items[0].quality).toEqual(23);
      });

      it("should decrease quality to 0 when past sell-by", () => {
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20));
        update_quality();
        expect(items[0].quality).toEqual(0);
      });

      it("should not increase quality > 50", () => {
        items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 1, 49));
        update_quality();
        expect(items[0].quality).toEqual(50);
      });
    });

    describe("Sulfuras", () => {
      it("should not decrease sell-in", () => {
        items.push(new Item("Sulfuras, Hand of Ragnaros", -1, 80));
        update_quality();
        expect(items[0].sell_in).toEqual(-1);
      });

      it("should not decrease quality", () => {
        items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
        update_quality();
        expect(items[0].quality).toEqual(80);
      });
    });

    xdescribe("Conjured items");
  })
});
