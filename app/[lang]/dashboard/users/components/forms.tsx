"use client";

import AccessibleDialogForm from "@/components/accible-dialog-form";
import { User } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  createUserAction,
  deleteUserAction,
  updateUserAction,
} from "../actions";
import { Eye, EyeOff } from "lucide-react";

export const UpdateUserRoleForm = ({ user }: { user: User }) => {
  const { lang }: { lang: Locale } = useParams();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      open={open}
      setOpen={setOpen}
      trigger={<button>تحديث المستخدم</button>}
      action={createUserAction}
      title="تحديث المستخدم"
      submit="تحديث"
      submitClass="mt-4 w-fit mx-auto"
    >
      <Input name="id" value={user.id} type={"hidden"} />
      <div className="flex flex-col gap-2 my-2 md:flex-row justify-between items-center">
        <Label htmlFor="role">اختيار دور جديد</Label>
        <Select
          name="role"
          dir={lang === "ar" ? "rtl" : "ltr"}
          defaultValue={user.role}
        >
          <SelectTrigger id="role" className="md:w-[180px] w-full">
            <SelectValue placeholder="الدور" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">
              {/* {roleToText({ role: "user", lang })} */}
            </SelectItem>
            <SelectItem value="admin">
              {/* {roleToText({ role: "admin", lang })} */}
            </SelectItem>
            <SelectItem value="superAdmin">
              {/* {roleToText({ role: "superAdmin", lang })} */}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </AccessibleDialogForm>
  );
};

export const CreateUserForm = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      submit="إنشاء"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<Button>إضافة مستخدم جديد</Button>}
      action={createUserAction}
      title="إضافة مستخدم جديد"
    >
      <div className="grid gap-4">
        <div>
          <Label htmlFor="fullName">الاسم الكامل</Label>
          <Input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="أدخل الاسم الكامل"
            required
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">رقم الهاتف</Label>
          <Input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="أدخل رقم الهاتف"
            required
            dir="rtl"
          />
        </div>
        <div>
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="أدخل البريد الإلكتروني"
            required
          />
        </div>
        <div>
          <Label htmlFor="password">كلمة المرور</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="أدخل كلمة المرور"
            required
          />
        </div>
        <div className="flex flex-col gap-2 my-2 md:flex-row justify-start items-start md:justify-between md:items-center">
          <Label htmlFor="role">الدور</Label>
          <Select name="role" dir="rtl" defaultValue="admin">
            <SelectTrigger id="role" className="md:w-[180px] w-full">
              <SelectValue placeholder="حدد الدور" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">مشرف</SelectItem>
              <SelectItem value="superAdmin">مدير</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2 my-2 md:flex-row justify-start items-start md:justify-between md:items-center">
          <Label htmlFor="verified">توثيق البريد الإلكتروني</Label>
          <Select name="verified" dir="rtl" defaultValue="false">
            <SelectTrigger id="verified" className="md:w-[180px] w-full">
              <SelectValue placeholder="حدد الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">موثق</SelectItem>
              <SelectItem value="false">غير موثق</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

export const UpdateUserForm = ({ user }: { user: User }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      submit="تحديث"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<button>تحديث مستخدم</button>}
      action={updateUserAction}
      title="تحديث معلومات المستخدم"
    >
      <Input type="hidden" name="id" id="id" defaultValue={user.id} readOnly />
      <div className="grid gap-4">
        <div>
          <Label htmlFor="fullName">الاسم الكامل</Label>
          <Input
            type="text"
            name="fullName"
            id="fullName"
            defaultValue={user.fullName}
            placeholder="أدخل الاسم الكامل"
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">رقم الهاتف</Label>
          <Input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            defaultValue={user.phoneNumber}
            placeholder="أدخل رقم الهاتف"
            dir="rtl"
          />
        </div>
        <div>
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            type="email"
            name="email"
            id="email"
            defaultValue={user.email}
            placeholder="أدخل البريد الإلكتروني"
          />
        </div>
        <div className="flex flex-col gap-2 my-2 md:flex-row justify-start items-start md:justify-between md:items-center">
          <Label htmlFor="role">الدور</Label>
          <Select name="role" dir="rtl" defaultValue={user.role}>
            <SelectTrigger id="role" className="md:w-[180px] w-full">
              <SelectValue placeholder="حدد الدور" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">مشرف</SelectItem>
              <SelectItem value="superAdmin">مدير</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2 my-2 md:flex-row justify-start items-start md:justify-between md:items-center">
          <Label htmlFor="verified">توثيق البريد الإلكتروني</Label>
          <Select
            name="verified"
            dir="rtl"
            defaultValue={user.verified ? "true" : "false"}
          >
            <SelectTrigger id="verified" className="md:w-[180px] w-full">
              <SelectValue placeholder="حدد الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">موثق</SelectItem>
              <SelectItem value="false">غير موثق</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

export const ResetPasswordForm = ({ user }: { user: User }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <AccessibleDialogForm
      submit="تغيير"
      open={open}
      dontReplace
      success="تم تحديث المستخدم بنجاح"
      setOpen={setOpen}
      trigger={<button>تغيير كلمة المرور</button>}
      action={updateUserAction}
      stopClosing
      title="تغيير كلمة المرور"
      description="استخدم هذا النموذج لإعادة تعيين كلمة المرور الخاصة بالمستخدم. يرجى إدخال كلمة المرور الجديدة وتأكيدها."
    >
      {/* Hidden input fields for user data */}
      <Input type="hidden" name="id" value={user.id} readOnly />
      <Input type="hidden" name="fullName" value={user.fullName} readOnly />
      <Input
        type="hidden"
        name="phoneNumber"
        value={user.phoneNumber}
        readOnly
      />
      <Input type="hidden" name="email" value={user.email} readOnly />
      <Input type="hidden" name="role" value={user.role} readOnly />
      <Input
        type="hidden"
        name="verified"
        value={user.verified ? "true" : "false"}
        readOnly
      />

      {/* Password input fields with show/hide functionality */}
      <div className="grid gap-4">
        <div>
          <Label htmlFor="password">كلمة المرور الجديدة</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="أدخل كلمة المرور الجديدة"
              required
            />
            <button
              type="button"
              className="absolute top-1/2 left-2 transform -translate-y-1/2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <div>
          <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="أعد إدخال كلمة المرور"
              required
            />
            <button
              type="button"
              className="absolute top-1/2 left-2 transform -translate-y-1/2"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      </div>
    </AccessibleDialogForm>
  );
};

export const DeleteUserForm = ({ id }: { id: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AccessibleDialogForm
      submit="حذف"
      open={open}
      setOpen={setOpen}
      dontReplace
      trigger={<button>حذف مستخدم</button>}
      action={deleteUserAction}
      title="حذف مستخدم"
      discardVariant={"default"}
      submitVariant={"outline"}
      description="من خلال هذا النموذج، يمكنك حذف المستخدم بسهولة. بمجرد الإرسال، سيتم حذف المستخدم بشكل نهائي."
    >
      <Input type="hidden" name="id" id="id" readOnly value={id} required />
    </AccessibleDialogForm>
  );
};
