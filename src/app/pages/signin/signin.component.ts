import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrl: "./signin.component.css",
})
export class SigninComponent {
  signinForm: FormGroup;
  error: string = "";
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  async onSubmit() {
    if (this.signinForm.valid) {
      this.isLoading = true;
      this.error = "";

      try {
        const { username, password } = this.signinForm.value;
        const success = await this.authService.signin(username, password);

        if (success) {
          this.router.navigate(["/quizzes"]);
        } else {
          this.error = "Invalid username or password";
        }
      } catch (error) {
        this.error = "An error occurred during sign in";
      } finally {
        this.isLoading = false;
      }
    }
  }

  goToSignup() {
    this.router.navigate(["/signup"]);
  }
}
