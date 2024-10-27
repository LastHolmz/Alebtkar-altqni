"use client";
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Contact } from "@prisma/client";
import { toast } from "@/hooks/use-toast";

export const msgsColumn: ColumnDef<Contact>[] = [
  {
    accessorKey: "الاسم",
    header: "الاسم",
    cell: ({ row }) => {
      if (row) {
        const fullName = row.original?.fullName;
        return <div>{fullName}</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "رقم الهاتف",
    header: "رقم الهاتف",
    cell: ({ row }) => {
      if (row) {
        const phone = row.original?.phone;
        return <div>{phone}</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "البريد",
    header: "البريد",
    cell: ({ row }) => {
      if (row) {
        const email = row.original?.email;
        return <div>{email}</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },
  {
    accessorKey: "المحتوى",
    header: "المحتوى",
    cell: ({ row }) => {
      if (row) {
        const content = row.original?.content;
        return <div>{content.substring(0, 200)}</div>;
      } else {
        <div>لايوجد</div>;
      }
    },
  },

  {
    id: "actions",
    header: "الأحداث",
    enableHiding: false,
    cell: ({ row }) => {
      const msg = row.original;
      return (
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">افتح الأحداث</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>الأحداث</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(String(msg.phone));
                toast({
                  className: "bg-primary text-white",
                  description: "تم نسخ رقم الهاتف بنجاح",
                });
              }}
            >
              نسح رقم الهاتف
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                // variant={"ghost"}
                className="w-full justify-around"
                // size={"sm"}
                href={`/dashboard/products/${msg.id}/update`}
              >
                تحديث المنتج
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              {/* <DeleteProductForm product={product} /> */}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
