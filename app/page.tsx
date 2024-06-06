"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Spacer, Input } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/date-picker";
import Swal from "sweetalert2";
import { DateValue, getLocalTimeZone } from "@internationalized/date";
import {Button} from "@nextui-org/react";

export default function Home() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState<DateValue>();

  const handleSubmit = async () => {
    const data = {
      nombre,
      apellido,
      fechaNacimiento: fechaNacimiento ? fechaNacimiento.toDate(getLocalTimeZone()).toISOString() : null,
    };

    console.log(data);

    try {
      const response = await fetch("https://localhost:7122/api/Autor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Swal.fire("Guardado!", "El autor se guardó correctamente.", "success");
        setNombre("");
        setApellido("");
      } else {
        Swal.fire("Error", "Hubo un problema al guardar el autor.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al guardar el autor.", "error");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-96 dark">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://cdn-icons-png.flaticon.com/512/5520/5520808.png"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">Agregar autor</p>
            <p className="text-small text-default-500">Ingresa los datos del autor</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <Input
            isRequired
            type="text"
            label="Nombre del autor"
            className="max-w-lg"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Spacer y={4} />
          <Input
            isRequired
            type="text"
            label="Apellido del autor"
            className="max-w-lg"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <Spacer y={4} />
          <DatePicker
            label="Fecha de nacimiento"
            className="max-w-lg dark"
            value={fechaNacimiento}
            onChange={setFechaNacimiento}
          />
        </CardBody>
        <Divider />
        <CardFooter>
        <Button color="success" variant="bordered" onClick={handleSubmit}>
        Guardar autor
      </Button>  
        </CardFooter>
      </Card>
    </main>
  );
}
