import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { productRoute } from "./routes/product.route";
import { ProductModel } from "../../product-adm/repository/product.model";
import { clientRoute } from "./routes/client.route";
import { invoiceRoute } from "./routes/invoice.route";
import { checkoutRoute } from "./routes/checkout.route";
import { ClientModel } from "../../client-adm/repository/client.model";
import { InvoiceModel } from "../../invoice/repository/invoice.model";
import TransactionModel from "../../payment/repository/transaction.model";
import { InvoiceItemsModel } from "../../invoice/repository/invoice-item.model";
import { productCatalogRoute } from "./routes/product-catalog.route";
import ProductCatalogModel from "../../store-catalog/repository/product.model";
export const app: Express = express();
app.use(express.json());
app.use("/product", productRoute);
app.use("/productCatalog", productCatalogRoute);
app.use("/client", clientRoute);
app.use("/invoice", invoiceRoute);
app.use("/checkout", checkoutRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
    logging: false,
  });
  await sequelize.addModels([
    ProductModel,
    ProductCatalogModel,
    ClientModel,
    TransactionModel,
    InvoiceModel,
    InvoiceItemsModel,
  ]);
  await sequelize.sync();
}
setupDb();
