import LayoutAdmin from '@components/Layout/LayoutAdmin';

const Admin = () => {
    return (
        <LayoutAdmin>
            <h1>Панель администратора</h1>
        </LayoutAdmin>
    );
};
Admin.getInitialProps = async (ctx) => {
    console.log(ctx.asPath, ctx.query);
    return {};
};
export default Admin;
