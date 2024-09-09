import Bool "mo:base/Bool";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

actor {
  type ShoppingItem = {
    id: Nat;
    description: Text;
    completed: Bool;
    completedAt: ?Int;
  };

  stable var nextId: Nat = 0;
  stable var items: [(Nat, ShoppingItem)] = [];

  public func addItem(description: Text) : async Result.Result<Nat, Text> {
    let id = nextId;
    nextId += 1;
    let newItem: ShoppingItem = {
      id;
      description;
      completed = false;
      completedAt = null;
    };
    items := Array.append(items, [(id, newItem)]);
    #ok(id)
  };

  public func toggleItemCompletion(id: Nat) : async Result.Result<Bool, Text> {
    let itemIndex = Array.indexOf<(Nat, ShoppingItem)>((id, {
      id;
      description = "";
      completed = false;
      completedAt = null;
    }), items, func(a, b) { a.0 == b.0 });
    
    switch (itemIndex) {
      case null { #err("Item not found") };
      case (?index) {
        let (_, item) = items[index];
        let updatedItem = {
          id = item.id;
          description = item.description;
          completed = not item.completed;
          completedAt = if (not item.completed) { ?Time.now() } else { null };
        };
        items := Array.tabulate<(Nat, ShoppingItem)>(items.size(), func (i) {
          if (i == index) { (id, updatedItem) } else { items[i] }
        });
        #ok(updatedItem.completed)
      };
    }
  };

  public func deleteItem(id: Nat) : async Result.Result<Bool, Text> {
    let itemIndex = Array.indexOf<(Nat, ShoppingItem)>((id, {
      id;
      description = "";
      completed = false;
      completedAt = null;
    }), items, func(a, b) { a.0 == b.0 });
    
    switch (itemIndex) {
      case null { #err("Item not found") };
      case (?index) {
        items := Array.tabulate<(Nat, ShoppingItem)>(items.size() - 1, func (i) {
          if (i < index) { items[i] } else { items[i + 1] }
        });
        #ok(true)
      };
    }
  };

  public query func getItems() : async [ShoppingItem] {
    Array.map(items, func((_, item): (Nat, ShoppingItem)) : ShoppingItem { item })
  };
}
