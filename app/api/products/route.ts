import { prismaBase } from "@/db/prisma";
import { insertProductSchema } from "@/lib/validators";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar los datos
    const validatedData = insertProductSchema.parse(body);

    // Crear el producto
    const product = await prismaBase.product.create({
      data: {
        ...validatedData,
        price: Number(validatedData.price),
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Error al crear el producto" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID del producto es requerido" },
        { status: 400 }
      );
    }

    // Validar los datos
    const validatedData = insertProductSchema.parse(data);

    // Actualizar el producto
    const product = await prismaBase.product.update({
      where: { id },
      data: {
        ...validatedData,
        price: Number(validatedData.price),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Error al actualizar el producto" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID del producto es requerido" },
        { status: 400 }
      );
    }

    // Eliminar el producto
    await prismaBase.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Error al eliminar el producto" },
      { status: 500 }
    );
  }
}
