import LayoutAdmin from '@components/Layout/LayoutAdmin';

const Admin = () => {
    return <LayoutAdmin>admin</LayoutAdmin>;
};
Admin.getInitialProps = async (ctx) => {
    console.log(ctx.asPath, ctx.query);
    return {};
};
export default Admin;
