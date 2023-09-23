import { Text } from "react-native";
import { Link, router } from "expo-router";

import { ScreenFrame } from "@/components/ScreenFrame";

import { typography } from "@/constants";

// NOT WORKING AS EXPECTED

export default function Modal() {
  const isPresented = router.canGoBack();

  return (
    <ScreenFrame>
      <Text style={typography.title}>HELLO, I'M A NEW MODAL!</Text>

      {isPresented && (
        <Link href="../">
          <Text style={typography.subtitle}>CLOSE MODAL</Text>
        </Link>
      )}
    </ScreenFrame>
  );
}
