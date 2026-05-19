"use client";

import {AlertDialog, Button} from "@heroui/react";
import { DeleteIcon } from "lucide-react";
import { redirect } from "next/navigation";

import { RiDeleteBin7Line } from "react-icons/ri";

export function DeleteAlert({room}) {
    const {_id,roomName} =room;

    const handleDelete = async () =>{
        const res = await fetch (`http://localhost:5000/rooms/${_id}`,{
            method:"DELETE",
            headers:{
                "content-type" : "application-json"
            }
        })
        const data = await res.json ();
        redirect("/rooms")
        console.log(data);
    }
  return (
    <AlertDialog>
      <Button variant="quiantity" className={"rounded-none mt-5 mb-5 border-1 hover:bg-blue-500"}><RiDeleteBin7Line />Delete room</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete room permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{roomName}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete room
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}