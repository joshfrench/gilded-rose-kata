describe("Gilded Rose", function() {

  describe("update_quality()", () => {
    afterEach(() => items = []);

    describe("common behaviors", () => {
      it("should decrease quality", () => {
        items.push(new Item("Foo", 10, 20));
        update_quality();
        expect(items[0].sell_in).toEqual(9);
      });

      it("should decrease sell-in", () => {
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
      it("should increase quality");
      it("should not increase quality > 50");
    });

    describe("Backstage", () => {
      it("should increase quality");
      it("should increase quality by 2 when < 10 days left");
      it("should increase quality by 3 when < 5 days left");
      it("should decrease quality to 0 when past sell-by")
      it("should not increase quality > 50");
    });

    describe("Sulfuras", () => {
      it("should not decrease sell-in");
      it("should not decrease quality");
    });

    xdescribe("Conjured items");
  })
});
