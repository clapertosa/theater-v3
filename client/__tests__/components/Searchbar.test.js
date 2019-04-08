import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import { ThemeProvider } from "styled-components";
import theme from "../../testUtils/theme";
import wait from "../../testUtils/wait";
import { shallow, mount } from "enzyme";
import Searchbar, { SEARCH_QUERY } from "../../components/Searchbar/Searchbar";

describe("SearchBar component", () => {
  let wrapper;
  let apolloClient;
  const mocks = [
    {
      request: {
        query: SEARCH_QUERY,
        variables: {
          query: "Meet Joe Black"
        }
      },
      result: {
        data: {
          search: {
            results: {
              id: 297,
              name: null,
              original_name: null,
              title: "Meet Joe Black",
              original_title: "Meet Joe Black",
              media_type: "movie",
              poster_path: "/s5maEXmEsVZYUx6dWc11GhL0zww.jpg",
              profile_path: null
            }
          }
        }
      }
    }
  ];

  beforeEach(() => {
    wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ThemeProvider theme={theme}>
          <ApolloConsumer>
            {client => {
              apolloClient = client;
              return <Searchbar />;
            }}
          </ApolloConsumer>
        </ThemeProvider>
      </MockedProvider>
    );
  });
  it("renders correctly", async () => {
    await wait();
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it("queries with ApolloClient", async () => {
    const res = await apolloClient.query({
      query: SEARCH_QUERY,
      variables: { query: "Meet Joe Black" }
    });

    expect(res.data.search.results.title).toEqual("Meet Joe Black");
  });
});
