import express, { Request, Response } from "express";
import { AddProductInputDto } from "../../../product-adm/usecase/add-product/add-product.dto";
import ProductFacadeFactory from "../../../product-adm/factory/facade.factory";
import StoreCatalogFacade from "../../../store-catalog/facade/store-catalog.facade";
import StoreCatalogFacadeFactory from "../../../store-catalog/factory/facade.factory";
import { AddProductFacadeInputDto } from "../../../store-catalog/facade/store-catalog.facade.interface";
export const productCatalogRoute = express.Router();

productCatalogRoute.post("/", async (req: Request, res: Response) => {
  const productCatalogFacade = StoreCatalogFacadeFactory.create();

  try {
    const productAdmDto: AddProductFacadeInputDto = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      salesPrice: req.body.salesPrice,
    };

    const output = await productCatalogFacade.add(productAdmDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
