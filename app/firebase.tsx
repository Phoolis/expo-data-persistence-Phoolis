import { database } from "@/firebaseConfig";
import { Paragraph, Screen, Title } from "@/utils/components";
import { styles } from "@/utils/styles";
import { onValue, push, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput } from "react-native";

type Product = { title: string; amount: string };

export default function Index() {
  const [product, setProduct] = useState({ title: "", amount: "" });
  const [items, setItems] = useState<Product[]>([]);

  const handleSave = () => {
    push(ref(database, "items/"), product);
  };

  useEffect(() => {
    onValue(ref(database, "items/"), (snapshot) => {
      const data = snapshot.val();
      if (!data) return;
      const firebaseItems = Object.values(data);
      setItems(firebaseItems as Product[]);
    });
  }, []);

  return (
    <Screen>
      <Title>Firebase</Title>
      <Paragraph>
        Firebase is a platform developed by Google that provides a variety of
        tools and services for building and managing mobile and web
        applications.
      </Paragraph>
      <Paragraph>
        Firebase provides Realtime Database that is NoSQL cloud database. Data
        is stored as JSON and synchronized in realtime to every connected
        client.
      </Paragraph>

      <TextInput
        placeholder="Product title"
        style={styles.textInput}
        onChangeText={(text) => setProduct({ ...product, title: text })}
        value={product.title}
      />

      <TextInput
        placeholder="Amount"
        style={styles.textInput}
        onChangeText={(text) => setProduct({ ...product, amount: text })}
        value={product.amount}
      />

      <Button onPress={handleSave} title="Save" />

      <FlatList
        renderItem={({ item }) => (
          <Text style={{ fontSize: 18 }}>
            {item.title}, {item.amount}
          </Text>
        )}
        data={items}
      />
    </Screen>
  );
}
