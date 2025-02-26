import { Screen } from "@/utils/components";
import { styles } from "@/utils/styles";
import { Link } from "expo-router";

export default function Index() {
  return (
    <Screen>
      <Link href="/asyncStorage" style={styles.link}>
        AsyncStorage
      </Link>
      <Link href="/sqlite" style={styles.link}>
        SQLite
      </Link>
      <Link href="/sqliteShopping" style={styles.link}>
        SQLiteShopping
      </Link>
      <Link href="/firebase" style={styles.link}>
        Firebase
      </Link>
    </Screen>
  );
}
