from typing import Union

import os
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from enum import Enum
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    Float,
    Enum as PgEnum,
    func,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProductType(str, Enum):
    fruit = "fruit"
    vegetable = "vegetable"
    meat = "meat"


class Product(BaseModel):
    id: int
    price: float
    name: str
    quantity: int
    weight: float
    image: str
    type: Union[ProductType, None] = None


class ProductDB(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    price = Column(Float)
    quantity = Column(Integer)
    weight = Column(Float)
    image = Column(String)
    type = Column(PgEnum(ProductType), nullable=True)


Base.metadata.create_all(bind=engine)

products = [
    ProductDB(
        id=1,
        name="Apples",
        price=1.49,
        image="https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        quantity=5,
        weight=1.0,
    ),
    ProductDB(
        id=2,
        name="Bananas",
        price=2.99,
        image="https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        quantity=3,
        weight=1.0,
    ),
    ProductDB(
        id=3,
        name="Oranges",
        price=3.49,
        image="https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        quantity=4,
        weight=1.0,
    ),
    ProductDB(
        id=4,
        name="Potatoes",
        price=1.99,
        image="https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        quantity=2,
        weight=1.0,
    ),
    ProductDB(
        id=5,
        name="Tomatoes",
        price=2.49,
        image="https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        quantity=6,
        weight=1.0,
    ),
    ProductDB(
        id=6,
        name="Carrots",
        price=1.29,
        image="https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        quantity=7,
        weight=1.0,
    ),
    ProductDB(
        id=7,
        name="Chicken",
        price=5.99,
        image="https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        quantity=1,
        weight=1.0,
    ),
    ProductDB(
        id=8,
        name="Beef",
        price=7.99,
        image="https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        quantity=2,
        weight=1.0,
    ),
]


def create_initial_products():
    db = SessionLocal()
    for product in products:
        if not db.query(ProductDB).filter(ProductDB.id == product.id).first():
            db.add(product)
    db.commit()
    db.close()


create_initial_products()


@app.get("/products")
def read_item(product_type: ProductType = None):
    db = SessionLocal()
    if product_type:
        products = db.query(ProductDB).filter(ProductDB.type == product_type).all()
    else:
        products = db.query(ProductDB).all()
    db.close()
    return products


@app.get("/products/{product_id}")
def get_product(product_id: int):
    db = SessionLocal()
    product = db.query(ProductDB).filter(ProductDB.id == product_id).first()
    db.close()
    if product:
        return product
    return {"error": "Product not found"}


@app.patch("/products/{product_id}/type")
def update_product_type(product_id: int, product_type: ProductType):
    db = SessionLocal()
    product = db.query(ProductDB).filter(ProductDB.id == product_id).first()
    if product:
        product.type = product_type
        db.commit()
        db.refresh(product)
        db.close()
        return product
    db.close()
    return {"error": "Product not found"}


@app.get("/products/type/count")
def get_products_type_count():
    db = SessionLocal()
    result = (
        db.query(ProductDB.type, func.count(ProductDB.type))
        .group_by(ProductDB.type)
        .all()
    )
    total_count = db.query(func.count(ProductDB.id)).scalar()
    none_count = (
        db.query(func.count(ProductDB.id)).filter(ProductDB.type == None).scalar()
    )
    db.close()
    type_count = {type_: count for type_, count in result}
    type_count["none"] = none_count
    type_count["total"] = total_count
    return type_count
