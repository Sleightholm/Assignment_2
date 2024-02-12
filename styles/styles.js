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
  subtitle: {
    textAlign: "center",
    fontSize: 15,
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  menuButton: {
    marginVertical: 10,
  },
});

export default styles;
