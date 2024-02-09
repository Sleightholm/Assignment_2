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
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    backgroundColor: "#f0f0f0",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  buttonContainer: {
    margin: 10,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
  },
  pressable: {
    padding: 10,
    backgroundColor: "green",
    margin: 10,
    height: 50,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

export default styles;
