import ConnectDb from "./Db/DbConnection";
import { app } from "./app";

ConnectDb()
  .then(() => {
    app.listen(process.env?.PORT || 3000, () => {
      console.log(`server is runnig on port:${process.env?.PORT}`);
    });
    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });
  })
  .catch((err) => {
    console.log(`Db Connection failed !!! : ${err}`);
  });
