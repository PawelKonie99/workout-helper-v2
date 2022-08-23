import { useContext } from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { yupResolver } from "@hookform/resolvers/yup"
import { NormalButton, TextInput, TextLink } from "@/components"
import { saveUserLogin } from "@/store/userReducer/actions/saveUserLogin"
import { ILoginFormSchema } from "@/types"
import { BUTTON_TYPES, BUTTON_VARIANT, INPUT_TYPES, RESPONSE_CODE } from "@/enums"
import { loginSchema } from "@/schema"
import { LoginUser } from "@/api"
import { PopUpContext } from "@/contexts"

const defaultFormValues: ILoginFormSchema = {
    username: "",
    password: "",
}

export const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { openPopup, closePopup } = useContext(PopUpContext)

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<ILoginFormSchema>({
        resolver: yupResolver(loginSchema()),
        defaultValues: defaultFormValues,
        mode: "all",
    })

    const onSubmit: SubmitHandler<ILoginFormSchema> = async (data) => {
        const { loggedUser, code } = await LoginUser(data)

        if (loggedUser?.token) {
            saveUserLogin(dispatch, loggedUser?.token)
        }

        if (code === RESPONSE_CODE.success) {
            navigate("/workout")
        } else {
            openPopup(
                <div className="w-full flex flex-col justify-center items-center">
                    <h1 className="mb-16 text-4xl">Niepowodzenie!</h1>
                    <NormalButton
                        label="Spróbuj ponownie!"
                        onClick={() => {
                            closePopup()
                        }}
                        buttonVariant={BUTTON_VARIANT.SECONDARY}
                    />
                </div>,
            )
        }

        reset()
    }

    return (
        <div className="py-12 flex justify-center items-center">
            <div className="bg-white px-12 py-12 flex flex-col items-center w-96 rounded-lg">
                {/* Consider to make h1 var in tailwind config */}
                <h1 className="text-3xl pb-8">Zaloguj się</h1>
                <div className="w-full mx-auto flex justify-center">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col items-center w-full"
                    >
                        <Controller
                            name="username"
                            control={control}
                            render={({ field: { name, onChange, ref, value } }) => (
                                <TextInput
                                    isError={errors.username}
                                    name={name}
                                    label="Username"
                                    onChange={onChange}
                                    inputRef={ref}
                                    value={value}
                                    errorMessage={errors.username?.message}
                                    placeholder="Username"
                                    classname="pb-4"
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field: { name, onChange, ref, value } }) => (
                                <TextInput
                                    autoComplete={"password"}
                                    inputType={INPUT_TYPES.PASSWORD}
                                    isError={errors.password}
                                    name={name}
                                    value={value}
                                    label={"Hasło"}
                                    onChange={onChange}
                                    inputRef={ref}
                                    errorMessage={errors.password?.message}
                                    placeholder={"Hasło"}
                                    classname="pb-4"
                                />
                            )}
                        />
                        <NormalButton label="Zaloguj sie" type={BUTTON_TYPES.SUBMIT} />
                    </form>
                </div>
                <TextLink href="register" label="Nie masz konta? Zarejestruj się!" />
            </div>
        </div>
    )
}
