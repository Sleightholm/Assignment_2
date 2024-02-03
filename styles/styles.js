import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  cell: {
    width: 100, // Set according to your grid size
    height: 100, // Set according to your grid size
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: "#f0f0f0", // Optional: for visual debugging
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});

export default styles;
