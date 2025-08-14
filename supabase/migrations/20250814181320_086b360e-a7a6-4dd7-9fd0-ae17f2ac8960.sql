-- Grant admin role to julian_102030@hotmail.com
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users 
WHERE email = 'julian_102030@hotmail.com'
ON CONFLICT (user_id, role) DO NOTHING;