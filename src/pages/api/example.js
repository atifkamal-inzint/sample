const fsPromises = require("fs").promises;
const path = require("path");

export default async function handler(req, res) {
  const dataFilePath = path.join(process.cwd(), "example_data/data.json");

  if (req.method === "GET") {
    try {
      const fileData = await fsPromises.readFile(dataFilePath);
      const parsedData = JSON.parse(fileData);

      res.status(200).json(parsedData);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error accessing data", error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const updatedData = JSON.stringify(req.body);

      // Update data
      await fsPromises.writeFile(dataFilePath, updatedData);
      res.status(200).json({ message: "Data updated successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error updating data", error: error.message });
    }
  }
}
