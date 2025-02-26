import { Paragraph, Screen, Title } from "@/utils/components";
import { styles } from "@/utils/styles";
import { openDatabaseSync } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

const db = openDatabaseSync("shoppinglist.db");

const initialize = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS shoppinglist (
      id INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      amount TEXT NOT NULL
      );
    `);
  } catch (error) {
    console.error("Could not open database", error);
  }
};

type Product = {
  id: number;
  title: string;
  amount: string;
};

export default function Index() {
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    initialize();
    updateList();
  }, []);

  const saveItem = async () => {
    try {
      await db.runAsync(
        "INSERT INTO shoppinglist (title, amount) VALUES (?, ?)",
        title,
        amount
      );
    } catch (error) {
      console.error("Could not add item", error);
    }

    updateList();
  };

  const updateList = async () => {
    try {
      const list = await db.getAllAsync("SELECT * from shoppinglist");
      setProducts(list as Product[]);
    } catch (error) {
      console.error("Could not get items", error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await db.runAsync("DELETE FROM shoppinglist WHERE id=?", id);
      await updateList();
    } catch (error) {
      console.error("Could not delete item", error);
    }
  };

  return (
    <Screen>
      <Title>SQLiteShopping</Title>
      <Paragraph>
        SQLite is light-weight SQL database and it is built into both Android
        and iOS devices.expo-sqlite is the library that gives an access to
        SQLite database on the device.
      </Paragraph>
      <View style={{ flexDirection: "row", padding: 20 }}>
        <TextInput
          placeholder="Product"
          style={styles.textInput}
          onChangeText={setTitle}
          value={title}
        />
        <TextInput
          placeholder="Amount"
          style={styles.textInput}
          onChangeText={setAmount}
          value={amount}
        />
        <Button onPress={saveItem} title="Save" />
      </View>
      <FlatList
        ListHeaderComponent={() => (
          <Text style={styles.title}>Shopping List</Text>
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Text>{item.title} </Text>
            <Text>{item.amount} </Text>
            <Text style={{ color: "blue" }} onPress={() => deleteItem(item.id)}>
              Bought
            </Text>
          </View>
        )}
        data={products}
      />
    </Screen>
  );
}
