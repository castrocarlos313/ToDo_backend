import { connect } from "mongoose";

export const conectarDB = async () => {
  try {
    await connect(process.env.DB_MONGO as string);

    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
