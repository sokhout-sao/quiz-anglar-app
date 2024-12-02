import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
})
export class SignupComponent {
  signupForm: FormGroup;
  error: string = "";
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        username: [
          "",
          [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")],
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              "^[a-zA-Z0-9#@&\"'(§!)°\\-_{}$€%£?;.:/\\\\=+]+$"
            ),
          ],
        ],
        confirmPassword: ["", Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get("password")?.value === g.get("confirmPassword")?.value
      ? null
      : { passwordMismatch: true };
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.error = "";

      try {
        const { username, password } = this.signupForm.value;
        const success = await this.authService.signup(username, password);

        if (success) {
          this.router.navigate(["/quizzes"]);
        } else {
          this.error = "Username already exists";
        }
      } catch (error) {
        this.error = "An error occurred during sign up";
      } finally {
        this.isLoading = false;
      }
    }
  }

  goToSignin() {
    this.router.navigate(["/signin"]);
  }
}
