"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "next-client-cookies";
import { loginSchema, LoginSchemaType } from "./schema";
import { login } from "./actions/actions";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginPage() {
    const router = useRouter();
    const cookies = useCookies();

    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(values: LoginSchemaType) {
        try {
            const result = await login(values);


            if (result.error) {

                toast.error(result.error?.message || "خطایی رخ داد");
                return;
            }

            if (result.data?.token) {
                toast.success("با موفقیت وارد شدید.");
                cookies.set("token", result.data.token);
                cookies.set("isLogged", "true");
                router.push("/dashboard");
                return;
            }

            toast.error("پاسخی برای ورود دریافت نشد.");
        } catch {

            toast.error("خطایی رخ داد");
        }
    }

    return (
        <div dir="rtl" className="flex min-h-screen items-center justify-center p-4 bg-muted/40">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1 text-right">
                    <CardTitle className="text-2xl font-bold tracking-tight">ورود</CardTitle>
                    <CardDescription>
                        نام کاربری و رمز عبور خود را وارد کنید تا به حساب کاربری دسترسی پیدا کنید.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>نام کاربری</FormLabel>
                                        <FormControl>
                                            <Input placeholder="نام کاربری خود را وارد کنید" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>رمز عبور</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="رمز عبور خود را وارد کنید" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "در حال ورود..." : "ورود"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
