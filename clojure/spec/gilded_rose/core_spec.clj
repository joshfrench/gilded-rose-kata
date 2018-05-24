(ns gilded-rose.core-spec
(:require [clojure.test :refer :all]
          [gilded-rose.core :refer [update-quality item update-item]]))

(deftest gilded-rose-test
  (testing "Common items"
    (is (= 9  (:sell-in (first (update-quality [(item "Elixir of the Mongoose" 10 20 )])))))
    (is (= 19 (:quality (first (update-quality [(item "Elixir of the Mongoose" 10 20)])))))
    (is (= 8  (:quality (first (update-quality [(item "Elixir of the Mongoose" 0 10)])))))
    (is (= 0  (:quality (first (update-quality [(item "Elixir of the Mongoose" 0 1)]))))))
  (testing "Brie"
    (is (= 12 (-> [(item "Aged Brie" 0 11)] update-quality first :quality)))
    (is (= 50 (-> [(item "Aged Brie" 0 49)] update-quality first :quality))))
  (testing "Backstage"
    (is (= 21 (-> [(item "Backstage passes to a TAFKAL80ETC concert" 15 20)] update-quality first :quality)))
    (is (= 22 (-> [(item "Backstage passes to a TAFKAL80ETC concert" 10 20)] update-quality first :quality)))
    (is (= 23 (-> [(item "Backstage passes to a TAFKAL80ETC concert" 5 20)] update-quality first :quality)))
    (is (= 0  (-> [(item "Backstage passes to a TAFKAL80ETC concert" 0 20)] update-quality first :quality)))
    (is (= 50 (-> [(item "Backstage passes to a TAFKAL80ETC concert" 5 49)] update-quality first :quality))))
  (testing "Sulfuras"
    (is (= -1 (-> [(item "Sulfuras, Hand of Rangaros" -1 80)] update-quality first :sell-in)))
    (is (= 80 (-> [(item "Sulfuras, Hand of Rangaros" 0 80)] update-quality first :quality))))

  (testing "update common item"
    (let [updated (update-item (item "Foo" 10 20))]
      (is (= 9  (:sell-in updated)))
      (is (= 19 (:quality updated))))
    (is (= 8 (-> (item "Foo" 0 10) update-item :quality)))
    (is (= 0 (-> (item "Foo" 0 1)  update-item :quality))))

  (testing "Brie"
    (is (= 9  (-> (item "Aged Brie" 10 10) update-item :sell-in)))
    (is (= 11 (-> (item "Aged Brie" 0  10) update-item :quality)))
    (is (= 50 (-> (item "Aged Brie" 0  50) update-item :quality))))

  (testing "Conjured"))
