import { SubmitButton } from "@/app/_components/SubmitButton";
import { forgotPasswordAction } from "@/app/actions/auth.actions";
import {
  CardDescription,
  CardHeader,
  CardTitle,
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xl">
        <Card>
          <CardHeader>
            <CardTitle>Forgot Password </CardTitle>
            <CardDescription>
              Enter your email below to retrieve your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={forgotPasswordAction} className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input type="email" required name="email" />
                </Field>

                <Field>
                  <SubmitButton text={"Submit"} />
                </Field>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/auth/signup">Sign up</a>
                </FieldDescription>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
